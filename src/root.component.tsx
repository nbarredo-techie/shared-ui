import { Button } from "./components/ui/button";

export default function Root(props) {
  return (
    <section className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-foreground">
        {props.name} is mounted!
      </h1>
      <div className="space-y-2">
        <Button variant="default">Default Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="destructive">Destructive Button</Button>
      </div>
    </section>
  );
}
