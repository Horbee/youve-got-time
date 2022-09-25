import { useSearchParams } from "react-router-dom"

interface CustomQuery {
  [k: string]: string;
}

export const useCustomSearchParams = <T extends CustomQuery>() => {
  const [search, setSearch] = useSearchParams();
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));

  return [searchAsObject, setSearch] as [Partial<T>, typeof setSearch];
};
