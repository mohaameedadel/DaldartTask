import error from "../../assets/404.svg"
export default function NotFoundPages() {
  return (
    <>
      <div className="container">
        <img src={error} className="max-w-full mx-auto" alt="404 error" />
        <h2 className="text-3xl text-main text-center font-bold uppercase my-2">Page NotFound</h2>
      </div>
    </>
  );
}
