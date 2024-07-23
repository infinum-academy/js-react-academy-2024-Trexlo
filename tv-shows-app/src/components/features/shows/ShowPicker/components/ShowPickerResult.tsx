import { useContext } from 'react';
import { ShowPickerContext } from './ShowPickerContextProvider';
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { ShowCard } from '@/components/shared/shows/ShowCard/ShowCard';
import { IShow } from '@/typings/Show.type';
import { ShowsList } from '@/components/shared/shows/ShowsList/ShowsList';
import { StarIcon } from '@chakra-ui/icons';



export const ShowPickerResult = () => {
	const { pickedShows } = useContext(ShowPickerContext);
	
	return (
		<SimpleGrid h={"500px"} columns={[1,1,2]} spacing={2}>
			{
				pickedShows.map((show, index) => 
					<Card key={index} w={"100%"} h={"100%"}>
					<Image alt="Show image" height={"100%"} width={"100%"} objectFit={"cover"} src={show.image_url || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
					<CardFooter justifyContent={"center"}>
						<Text>{show.title}</Text>
						<Flex alignItems={"center"} gap={"4px"}>
							<StarIcon/>
							<Text>{(show.average_rating && (show.average_rating.toFixed(1) + " / 5")) || "No ratings"}</Text>
						</Flex>    
					</CardFooter>
				</Card>
				)
			}
		</SimpleGrid>

	)
	
};

