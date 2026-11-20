import { Notice } from "@/components/notice";

export default function MovieNotFound() {
  return (
    <Notice
      title="Film not found"
      body="That title is not in the TMDB catalog."
      action={{ href: "/", label: "Back to today" }}
    />
  );
}
