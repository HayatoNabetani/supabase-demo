import { createPost } from "../actions/post";

const Form = () => {
  return (
    <form action={createPost}>
      <h1>記事の作成</h1>
      <textarea name="body" />
      <button type="submit">作成</button>
    </form>
  );
};

export default Form;
