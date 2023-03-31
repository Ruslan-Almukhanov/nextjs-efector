import { UserService } from "@/pages/users/model/api";
import { IUser } from "@/pages/users/model/types";
import { NextPageContext } from "next";

const UserCard = ({ user }: { user: IUser }) => {
  return <div>UserCard {user.id}</div>;
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const user = await UserService.getUserById(id);

  return {
    props: {
      user,
    },
  };
}
export default UserCard;
