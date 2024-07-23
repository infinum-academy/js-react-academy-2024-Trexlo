import { apiPaths } from "@/app/data/api-paths";
import { deleteReview } from "@/fetchers/show";
import { CloseIcon } from "@chakra-ui/icons";
import { Button, IconButton, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

interface IDeleteReviewItemButtonProps {
    reviewId : string;
    showId: string;
}

export const DeleteReviewItemButton = ({reviewId, showId}: IDeleteReviewItemButtonProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
    const { trigger } = useSWRMutation(apiPaths.review(reviewId), deleteReview,
        {
            onSuccess: () => {
                mutate(apiPaths.showReviews(showId));
                mutate(apiPaths.show(showId));
                onClose();
            }
        }
    );

    const onDelete = async () => {
        await trigger();
    }

    return (
        <>
            <Button
                w={["100%", "100%", "fit-content"]}
                backgroundColor={"white"}
                color={"purple"}
                rounded={20}
                onClick={onOpen}
            >Remove</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Are you sure you want to delete the review?</ModalHeader>
                    <ModalCloseButton as={IconButton} icon={<CloseIcon />} />
					<ModalFooter gap={3}>
						<Button onClick={onClose} variant={"modalButtonSecondary"}>No</Button>
						<Button onClick={onDelete} variant={"modalButtonPrimary"}>Yes</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
        </>
    );
}