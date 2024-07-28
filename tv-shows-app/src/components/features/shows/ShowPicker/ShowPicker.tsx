'use client'
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Flex } from "@chakra-ui/react";
import { ShowPickerProgress } from "./components/ShowPickerProgress";
import { ShowPickerButtons } from "./components/ShowPickerButtons";
import { ShowPickerStepper } from "./components/ShowPickerStepper";

export const ShowPicker = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button onClick={onOpen} variant={["navigationButtonActive","navigationButtonActive","navigationButton"]}>Pick your show</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Show Picker</ModalHeader>
					<ModalBody>
						<ShowPickerStepper />
					</ModalBody>
					<ModalFooter>
						<Flex direction="column" width="100%" gap={3}>
							<ShowPickerProgress />
							<ShowPickerButtons onClose={onClose}/>
						</Flex>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}