import Link from "next/link";
import rest from "../../../utils/rest";

export default function Tag({ items }) {
  return (
    <div className="container mx-auto px-4 pt-10">
      <h1 className="text-4xl my-7">Tags</h1>
      {items.map((tag, i) => (
        <Link key={tag._id} href={tag.href} passHref>
          <span
            className="py-2 px-3 font-bold text-2xl mr-2 shadow-lg rounded-md cursor-pointer tracking-wider"
            style={{
              background: tag.background,
              color: tag.color,
            }}
          >
            {tag.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  let items = [];
  const [res, err] = await rest.get("/tags");

  if (!err) {
    items = res.data.data;
  }

  return {
    props: {
      items,
    },
  };
}
