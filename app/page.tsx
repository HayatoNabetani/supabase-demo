import { getPosts } from "@/datas/posts";
import { format } from "date-fns";
import Form from "./components/form";
import { signIn } from "./actions/auth";

export default async function Home() {
  const posts = await getPosts();
  if (!posts) {
    return null;
  }

  return (
    <div>
      <Form />
      <form action={signIn}>
        <button>ログイン</button>
      </form>
      <main className="space-y-2 container my-6">
        {posts?.map((post) => (
          <div key={post.id} className="p-4 border rounded shadow-sm">
            <h2>{post.body}</h2>
            <p>{format(post.createdAt, "yyyy年mm月dd日")}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
