import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { cn } from "~/utils/cn";

interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  icon?: React.ReactNode;
  labelClassName?: string;
}

const Button = ({ className, label, icon, disabled, labelClassName, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      className={cn(
        "h-12 items-center bg-primary justify-center rounded-lg border border-transparent transition-colors duration-200",
        className,
        disabled ? "bg-gray-5" : ""
      )}
      {...props}
    >
      {icon && <View className="absolute left-4">{icon}</View>}
      <Text
        className={cn(
          "text-white transition-colors duration-200 typo-label-16",
          labelClassName,
          disabled ? "!text-gray-2" : ""
        )}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
