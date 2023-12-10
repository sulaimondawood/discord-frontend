import SideBar from "@/components/Sidebar/SideBar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start">
      <SideBar></SideBar>
      {children}
    </div>
  );
}
