import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Define a generator called "react-component"
  plop.setGenerator("react-component", {
    description: "Adds a new React component to the packages/ui workspace",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component? (e.g. Button, CardHeader)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/ui/src/{{kebabCase name}}.tsx",
        templateFile: "templates/component.hbs",
      },
      {
        type: "append",
        path: "packages/ui/package.json",
        pattern: /"exports": \{(?!\s*"\\.\/\*":)/g,
        template: '    "./{{kebabCase name}}": "./src/{{kebabCase name}}.tsx",',
      },
    ],
  });
}
