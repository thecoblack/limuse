import TableHeader, { HeaderOrder, HeaderTitlesMap } from "./header";

interface TableProps {
  children: React.ReactNode;
}

export default function Table(props: TableProps) {
  return <table className="w-full">{props.children}</table>;
}
