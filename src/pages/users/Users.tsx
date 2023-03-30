import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useEvent, useStore } from "effector-react";
import Link from "next/link";
import { useEffect } from "react";
import { $users, pageOpened } from "./model/store";
import styles from "./Users.module.scss";
const Users = () => {
  const users = useStore($users);
  const pageMounted = useEvent(pageOpened);
  useEffect(() => {
    pageMounted();
  }, [pageMounted]);
  console.log(users);

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
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
