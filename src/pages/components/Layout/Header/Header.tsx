import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/todos">Todos</Link>
          </li>

          <li>
            <Link href="/auth/redirect">Log In</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
