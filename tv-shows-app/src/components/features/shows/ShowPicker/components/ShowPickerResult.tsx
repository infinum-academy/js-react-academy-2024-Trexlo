import { useContext } from 'react';
import { ShowPickerContext } from './ShowPickerContextProvider';
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { ShowCard } from '@/components/shared/shows/ShowCard/ShowCard';
import { IShow } from '@/typings/Show.type';
import { ShowsList } from '@/components/shared/shows/ShowsList/ShowsList';



export const ShowPickerResult = () => {
	const { pickedShows } = useContext(ShowPickerContext);
	
	return (
		<SimpleGrid h={"500px"} columns={2} spacing={2}>
			{
				pickedShows.map((show, index) => 
					<ShowCard key={index} show={show}></ShowCard>
				)
			}
		</SimpleGrid>

	)
	
};

