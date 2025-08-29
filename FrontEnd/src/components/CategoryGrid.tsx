import {
  Heart,
  Zap,
  Brain,
  Sword,
  Star,
  Globe,
  Clock,
  Coffee,
  Lightbulb,
  Users,
  Mountain,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Icon mapping
const iconMap = {
  heart: Heart,
  zap: Zap,
  brain: Brain,
  sword: Sword,
  star: Star,
  globe: Globe,
  clock: Clock,
  coffee: Coffee,
  lightbulb: Lightbulb,
  users: Users,
  mountain: Mountain,
  bookopen: BookOpen,
};

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {categories.map((category, index) => {
        const iconKey = category?.icon?.toLowerCase();
        const IconComponent = iconMap[iconKey] || BookOpen;

        // Default colors if not provided
        const bgColor = category.bgColor || "#f3f4f6";
        const textColor = category.textColor || "#000000";
        const gradientFrom = category.gradientFrom || "#9ca3af";
        const gradientTo = category.gradientTo || "#6b7280";

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-card border border-border/50 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    style={{ backgroundColor: bgColor }}
                    className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  >
                    <IconComponent 
                      style={{ color: textColor }}
                      className="h-6 w-6" 
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {category.name || "Unnamed"}
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {category.count ?? 0} books
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {category.description || "No description available."}
                </p>

               
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CategoryGrid;