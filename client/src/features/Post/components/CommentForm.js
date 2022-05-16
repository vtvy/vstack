import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";

function CommentForm({ onSubmit, initialValue }) {
    const inputRef = useRef(null);
    const [isValid, setIsValid] = useState(false);
    const { register, handleSubmit, watch, setValue } = useForm({
        model: "onChange",
    });

    const onSubmitForm = (data) => {
        if (isValid) {
            onSubmit(data);
        }
    };

    useEffect(() => {
        if (watch("reply") !== initialValue.reply) {
            setIsValid(true);
        } else setIsValid(false);
    }, [watch("reply")]);

    useEffect(() => {
        setValue("reply", initialValue.reply);
    }, [initialValue]);

    return (
        <>
            <div className="flex w-full items-center">
                <form className="w-full" onSubmit={handleSubmit(onSubmitForm)}>
                    <textarea
                        className="bg-slate-800 w-full text-white  outline-none resize-none rounded-lg px-6 py-4"
                        type="text"
                        rows="3"
                        autoFocus
                        defaultValue={initialValue.reply}
                        {...register("reply")}
                        placeholder="write an answer..."
                    />
                    <Button
                        type="submit"
                        w="w-full"
                        h="h-[4rem] "
                        isValid={isValid}
                    >
                        <span className="capitalize"> Answer</span>
                    </Button>
                </form>
            </div>
            <div ref={inputRef} className="w-1 h-1"></div>
        </>
    );
}

export default CommentForm;
