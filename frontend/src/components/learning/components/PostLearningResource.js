// libraries
import React, { useState, useCallback } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import { Textarea } from "baseui/textarea";
// utilities
import OutsideClick from "../../../utils/OutsideClick";
// hooks
import usePostLearningResource from "../hooks/usePostLearningResource";

function PostLearningResource({
    setPostLearningResource,
    fetchLearningResources,
}) {
    const [postError, postResource] = usePostLearningResource();
    const [value, setValue] = useState({
        title: "",
        link: "",
    });
    const handleClose = useCallback(
        (e) => {
            setPostLearningResource(false);
        },
        [setPostLearningResource]
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            postResource(value);
            fetchLearningResources();
            handleClose();
        },
        [postResource, fetchLearningResources, handleClose, value]
    );
    const handleChange = useCallback(
        (e) => {
            setValue({
                ...value,
                [e.currentTarget.name]: e.currentTarget.value,
            });
        },
        [value, setValue]
    );
    return (
        <div className="postResource">
            <OutsideClick handleClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <FormControl label={() => "Title"}>
                        <Input
                            placeholder="Enter Title"
                            value={value.title}
                            type="text"
                            name="title"
                            onChange={handleChange}
                            size={SIZE.compact}
                        />
                    </FormControl>
                    <FormControl label={() => "Link"}>
                        <Input
                            placeholder="Enter Link"
                            value={value.link}
                            type="text"
                            name="link"
                            onChange={handleChange}
                            size={SIZE.compact}
                        />
                    </FormControl>
                    <div className="postResource__btnHolder">
                        <Button
                            type="submit"
                            className="btnCustom"
                            size={SIZE.compact}
                        >
                            Post
                        </Button>
                        <Button
                            onClick={handleClose}
                            className="btnCustom--tertiary ml1"
                            size={SIZE.compact}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </OutsideClick>
        </div>
    );
}

export default PostLearningResource;
