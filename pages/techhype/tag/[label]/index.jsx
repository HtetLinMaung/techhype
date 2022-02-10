import rest from "../../../../utils/rest";
import Link from "next/link";

export default function TagDetail({ tag, items }) {
  return (
    <div className="container mx-auto px-4 pt-10">
      <header>
        <h1
          className="py-2 px-4 font-bold text-4xl shadow-lg rounded-md tracking-wider inline-flex my-3"
          style={{
            background: tag.background,
            color: tag.color,
          }}
        >
          {tag.label.replace("#", "").replaceAll("-", " ")}
        </h1>
        <div className="text-xl text-gray-300 p-5 border-dashed border-2 border-gray-500 mb-5">
          {tag.description}
        </div>
      </header>
      <div className="grid lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="bluish-color p-5 rounded-xl hover:-translate-y-1 ease-in-out duration-300 overflow-hidden"
            style={{ maxWidth: 650 }}
          >
            <Link href={item.href} passHref>
              <h1 className="my-6 text-2xl cursor-pointer">{item.title}</h1>
            </Link>
            <p className="text-xl my-5 text-gray-300">{item.description}</p>
            {item.tags.map((tag, i) => (
              <Link key={tag._id} href={tag.href} passHref>
                <span
                  className="py-2 px-3 text-sm mr-2 rounded-md cursor-pointer tracking-wider"
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
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let tag = null;
  let items = [];

  let [res, err] = await rest.get(`/tags/${context.query.label}`);

  if (!err) {
    tag = res.data.data;
    [res, err] = await rest.get("/query", {
      tagid: tag._id,
      populate: "tags",
    });
    if (!err) {
      items = res.data.data;
      console.log(items);
    }
  }

  return {
    props: { tag, items },
  };
}
