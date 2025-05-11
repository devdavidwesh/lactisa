import { BsExclamationTriangle } from "react-icons/bs";

interface FormErrorProps {
    message?: string;
};

export const FormError = ({
    message,
}: FormErrorProps) => {
    if (!message) return null;

    return (
        <div className="bg-rose-700 p-3 rounded-md flex items-center gap-x-2 text-base text-rose-100 col-span-2">
            <BsExclamationTriangle className = "h-4 w-4" />
            <p>{message}</p>
        </div>
    )
}