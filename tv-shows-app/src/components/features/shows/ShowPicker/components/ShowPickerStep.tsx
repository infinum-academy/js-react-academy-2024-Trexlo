import { useContext, useState } from 'react';
import { ShowPickerContext } from './ShowPickerContextProvider';
import { Card,CardFooter, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { IShow } from '@/typings/Show.type';



export const ShowPickerStep = () => {
	const { currentStep, showsList, pickedShows, setPickedShows } = useContext(ShowPickerContext);
	var shows = [] as Array<IShow>;

	switch(currentStep){
		case 0:{
			shows = showsList.filter(s=>!pickedShows.find(s2 => s2==s) || pickedShows[currentStep] == s);
			shows = shows.slice(0,4)
		}break;
		case 1:{
			shows = showsList.filter(s=>!pickedShows.find(s2 => s2==s) || pickedShows[currentStep] == s);
			shows = shows.slice(shows.length-4);
		}break;
		case 2:{
			shows = showsList.toSorted((a,b) => (a.no_of_reviews || 0) - (b.no_of_reviews || 0)).filter(s=>!pickedShows.find(s2 => s2==s) || pickedShows[currentStep] == s);
			shows = shows.slice(0,4)
		}break;
		case 3:{
			shows = showsList.toSorted((a,b) => (a.no_of_reviews || 0) - (b.no_of_reviews || 0)).filter(s=>!pickedShows.find(s2 => s2==s) || pickedShows[currentStep] == s);
			shows = shows.slice(shows.length-4);
		}break;
	}
	
	return (
		 <SimpleGrid h={"500px"} columns={2} spacing={2}>
			{
				shows.map((show, index) => {
					const isPicked = pickedShows.find(s => s === show);
					return <Card bg={isPicked?"green.100":"none"} key={index} w={"100%"} h={"100%"} onClick={()=>{
										var shows = pickedShows;
										shows[currentStep] = show;
										setPickedShows([...shows]);
									}}>
								<Image alt="Show image" height={"100%"} width={"100%"} objectFit={"cover"} src={show.image_url || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
								<CardFooter justifyContent={"center"}>
									<Text>{show.title}</Text>
								</CardFooter>
							</Card>
				})
			}
		 </SimpleGrid>
	)
	
};