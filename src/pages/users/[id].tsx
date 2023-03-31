import { UserService } from "@/pages/users/model/api";
import { IUser } from "@/pages/users/model/types";
import { NextPageContext } from "next";

const UserCard = ({ user }: { user: IUser }) => {
  return <div>UserCard {user.id}</div>;
};

export async function getServerSideProps(context: NextPageContext) {
  let { id } = context.query;

  if (!id) return {};

  if (Array.isArray(id)) {
    id = id[0];
  }

  const user = await UserService.getUserById(id);

  return {
    props: {
      user,
    },
  };
}
export default UserCard;
