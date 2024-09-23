import { SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 bg-second  flex justify-center items-center">
        <SyncLoader color="#254336" />
      </div>
    </>
  );
}
