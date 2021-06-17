import * as React from "react";
import { Form, Button } from "antd";

import { fieldNames } from "./constants";
import { RolesGroup } from "./RolesGroup";

const data = [
  {
    groupName: "Servers",
    privileges: [
      {
        id: 2,
        name: "Read",
        readOnly: true,
      },
      {
        id: 3,
        name: "Update",
        readOnly: false,
      },
      {
        id: 1,
        name: "Create",
        readOnly: false,
      },
      {
        id: 4,
        name: "Delete",
        readOnly: false,
      },
      {
        id: 5,
        name: "Compare",
        readOnly: false,
      },
    ],
  },
  {
    groupName: "Preferences",
    privileges: [
      {
        id: 53230,
        name: "Edit system",
        readOnly: false,
      },
      {
        id: 53226,
        name: "Read",
        readOnly: true,
      },
    ],
  },
];

const ComplexForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("===========Submitted values============");
    console.log(values);
  };

  const prepareFormInitialValues = (data) =>
    data.map(({ groupName }) => ({
      groupName,
      [fieldNames.privileges]: [],
    }));

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        [fieldNames.userRolesData]: prepareFormInitialValues(data),
      }}
      style={{
        border: "1px solid grey",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Form.List name={fieldNames.userRolesData}>
          {(fields) =>
            fields.map((field) => {
              const { name: currentPrivilegeIndex } = field;
              const { groupName, privileges } = data[currentPrivilegeIndex];

              return (
                <RolesGroup
                  form={form}
                  currentPrivilegeIndex={currentPrivilegeIndex}
                  groupName={groupName}
                  privileges={privileges}
                  key={groupName}
                />
              );
            })
          }
        </Form.List>
      </section>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

export { ComplexForm as Form };
