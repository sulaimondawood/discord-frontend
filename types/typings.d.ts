interface RoomList {
  id: number;
  avatar: string;
  created: string;
  description: string;
  host: number;
  members: nummber[];
  name: string;
  topic: number;
  updated: string;
}

interface NavType {
  id: number;
  name: string;
  url: string;
  icon: IconType;
}
