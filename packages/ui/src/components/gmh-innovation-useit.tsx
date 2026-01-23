import { Card } from "./ui";
import { Circle, Square, Plus, Star, ArrowRight } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Circle,
    title: "Initial Step",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Start your journey here.",
    color: "bg-gray-300",
  },
  {
    number: 2,
    icon: Square,
    title: "Configuration",
    description:
      "Configure your settings and preferences to match your needs perfectly.",
    color: "bg-gray-400",
  },
  {
    number: 3,
    icon: Plus,
    title: "Add Components",
    description:
      "Add the necessary components and integrate with your existing workflow.",
    color: "bg-gray-300",
  },
  {
    number: 4,
    icon: Square,
    title: "Testing Phase",
    description:
      "Test thoroughly to ensure everything works as expected before deployment.",
    color: "bg-gray-400",
  },
  {
    number: 5,
    icon: Star,
    title: "Launch",
    description:
      "Deploy and launch your innovation to start seeing real-world results.",
    color: "bg-gray-300",
  },
];

export function HowToUseSection() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-5xl md:text-6xl font-serif text-white text-center mb-16">How do you use it?</h2>

        <div>
          <Card className="p-8 bg-white/10 backdrop-blur-sm shadow-2xl relative border-white/20">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.number}>
                  <div
                    className={`flex items-start gap-6 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-[#AA9868]">
                          {step.number}.
                        </span>
                        <div
                          className={`${step.color} w-20 h-20 rounded-lg flex items-center justify-center`}
                        >
                          <step.icon className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex-1 ${index % 2 === 0 ? "text-left" : "text-right"}`}
                    >
                      <h4 className="text-white mb-2">{step.title}</h4>
                      <p className="text-white/80">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"} my-4`}
                    >
                      <ArrowRight
                        className="w-8 h-8 text-[#AA9868]"
                        style={{
                          transform:
                            index % 2 === 0
                              ? "rotate(90deg)"
                              : "rotate(90deg) scaleX(-1)",
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}