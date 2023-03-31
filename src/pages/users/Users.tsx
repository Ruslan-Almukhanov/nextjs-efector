import AddUserForm from "@/pages/users/components/AddUserForm/AddUserForm";
import { addUser, deleteUser } from "@/pages/users/model/store";
import { IUser } from "@/pages/users/model/types";
import { Button, Card, Modal } from "antd";
import Meta from "antd/lib/card/Meta";
import { useForm } from "antd/lib/form/Form";
import { useEvent, useStore, useUnit } from "effector-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { $users, pageOpened, postNewUserFx } from "./model/store";
import styles from "./Users.module.scss";

const Users = () => {
  const users = useStore($users);
  const pageMounted = useEvent(pageOpened);
  const isLoading = useUnit(postNewUserFx.pending);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addUserForm] = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (data: IUser) => {
    addUser(data);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (event: Event, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    deleteUser(id);
  };

  useEffect(() => {
    pageMounted();
  }, [pageMounted]);

  return (
    <div className={styles.users}>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <Card
                hoverable
                style={{ width: 140 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
                extra={
                  <Button
                    onClick={(event: any) => handleDelete(event, user.id)}
                    danger
                  >
                    Delete
                  </Button>
                }
              >
                <Meta title={user.name} description={user.phone} />
              </Card>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles["add-user"]}>
        <Button type="primary" size="large" onClick={showModal}>
          Add User
        </Button>
      </div>
      <Modal
        title="Add new User"
        open={isModalOpen}
        onOk={addUserForm.submit}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <AddUserForm form={addUserForm} onFinish={handleOk} />
      </Modal>
    </div>
  );
};

export default Users;
