import { FaUserFriends } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { SiBoost } from "react-icons/si";

const navLists = [
  {
    id: 1,
    name: "Friends",
    url: "/friends",
    icon: <FaUserFriends />,
  },
  {
    id: 2,
    name: "Nitro",
    url: "",
    icon: <SiBoost />,
  },
  {
    id: 3,
    name: "Shop",
    url: "",
    icon: <AiFillShop />,
  },
];

export default navLists;
