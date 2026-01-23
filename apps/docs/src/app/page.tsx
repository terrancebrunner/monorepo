import { ProfileCard } from "@repo/ui";

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-8">
        <ProfileCard
          name="Terrance Brunner"
          role="Senior Design Engineer"
          avatarUrl="https://jeffersonkidd.com/img/logo.png"
          skills={["UX / UI", "Design Systems", "Figma", "Prototyping", "React / CSS / TypeScript"]}
          recentActivity="Reduced design-to-code handoff time by 60%"
          team="GW Global Mental Health"
          email="terrancebrunner@gmail.com"
        />
    </main>
  );
}