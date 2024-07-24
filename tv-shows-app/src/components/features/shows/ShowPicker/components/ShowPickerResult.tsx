import { useContext } from 'react';
import { ShowPickerContext } from './ShowPickerContextProvider';
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { ShowCard } from '@/components/shared/shows/ShowCard/ShowCard';
import { IShow } from '@/typings/Show.type';
import { ShowsList } from '@/components/shared/shows/ShowsList/ShowsList';
import { StarIcon } from '@chakra-ui/icons';



export const ShowPickerResult = () => {
	const { pickedShows, currentRound, maxRounds } = useContext(ShowPickerContext);
	
	if(currentRound != maxRounds){
		return(
			<>
			<Heading>Round {currentRound+1} winners</Heading>
			<SimpleGrid h={"500px"}  columns={[1,1,2]} spacing={2}>
			{
				pickedShows[currentRound].map((show, index) => {
					return  <Card key={index} w={"100%"} h={"100%"}>
								<Image display={["none", "none", "block"]} alt="Show image" height={"100%"} width={"100%"} objectFit={"cover"} src={show.image_url || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
								<CardFooter alignContent={"center"} justifyContent={"center"}>
									<Text>{show.title}</Text>
								</CardFooter>
							</Card>
				})
			}
			</SimpleGrid>
			</>
		)
	}

	return (
		<>
			<Heading>Tonight you are watching:</Heading>
			{
				pickedShows[currentRound].map((show, index) => 
					<Card key={index} w={"100%"} h={"100%"}>
						<Image alt="Show image" height={"100%"} width={"100%"} objectFit={"cover"} src={show.image_url || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
						<CardFooter justifyContent={"center"} gap={4}>
							<Text>{show.title}</Text>
							<Flex alignItems={"center"} gap={"4px"}>
								<StarIcon/>
								<Text>{(show.average_rating && (show.average_rating.toFixed(1) + " / 5")) || "No ratings"}</Text>
							</Flex>    
						</CardFooter>
					</Card>
				)
			}
		</>
	)
	
};

