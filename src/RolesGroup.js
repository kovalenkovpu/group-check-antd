import * as React from "react";
import { Form, Checkbox } from "antd";

import { fieldNames } from "./constants";

const RolesGroup = ({ form, currentPrivilegeIndex, groupName, privileges }) => {
  const [isIndeterminate, setIndeterinate] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);

  const filteredPrivileges = React.useMemo(
    () =>
      privileges.filter(({ readOnly }) => !readOnly).map(({ name }) => name),
    [privileges]
  );

  const onPrivilegeCheck = () => {
    const formValues = form.getFieldsValue();
    const userRolesData = formValues[fieldNames.userRolesData];

    if (!userRolesData) {
      return false;
    }

    const { privileges: currentPrivileges } = userRolesData.find(
      (roleData) => roleData.groupName === groupName
    );

    const isIndeterminate =
      currentPrivileges.length !== 0 &&
      currentPrivileges.length !== filteredPrivileges.length;
    const isChecked = currentPrivileges.length === filteredPrivileges.length;

    setIndeterinate(isIndeterminate);
    setChecked(isChecked);
  };

  const onGroupNameCheck = ({ target }) => {
    const isGroupChecked = target.checked;
    const formValues = form.getFieldsValue();
    const newFormValues = formValues[fieldNames.userRolesData].map(
      (roleData) => {
        if (roleData.groupName === groupName) {
          return {
            ...roleData,
            [fieldNames.privileges]: isGroupChecked ? filteredPrivileges : [],
          };
        }

        return roleData;
      }
    );

    form.setFieldsValue({ [fieldNames.userRolesData]: newFormValues });

    setIndeterinate(false);
    setChecked(isGroupChecked);
  };

  return (
    <section key={groupName}>
      <Form.Item name={[currentPrivilegeIndex, fieldNames.groupName]}>
        <Checkbox
          value={groupName}
          onChange={onGroupNameCheck}
          indeterminate={isIndeterminate}
          checked={isChecked}
        >
          {groupName}
        </Checkbox>
      </Form.Item>
      <Form.Item name={[currentPrivilegeIndex, fieldNames.privileges]}>
        <Checkbox.Group>
          {privileges.map(({ name, readOnly }) => (
            <Form.Item key={name} onChange={onPrivilegeCheck}>
              <Checkbox value={name} disabled={readOnly}>
                {name}
              </Checkbox>
            </Form.Item>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </section>
  );
};

export { RolesGroup };
