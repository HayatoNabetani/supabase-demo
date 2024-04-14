import { redirect } from "next/navigation";

const SearchForm = () => {
  return (
    <form
      action={async (data: FormData) => {
        "use server";
        const keyword = data.get("keyword");
        redirect(`/?keyword=${keyword}`);
      }}
    >
      <input type="text" name="keyword" />
      <button>検索</button>
    </form>
  );
};

export default SearchForm;
