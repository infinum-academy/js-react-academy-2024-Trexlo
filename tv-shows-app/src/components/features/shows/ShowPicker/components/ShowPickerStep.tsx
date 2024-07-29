import { useContext } from 'react';
import { ShowPickerContext } from './ShowPickerContextProvider';
import { Card,CardFooter, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { IShow } from '@/typings/Show.type';



export const ShowPickerStep = () => {
	const { currentStep, showsList, pickedShows, currentRound, setPickedShows } = useContext(ShowPickerContext);
	var shows = [] as Array<IShow>;
	if(currentRound == 0){
		switch(currentStep){
			case 0:{
				shows = showsList.filter(s=>!pickedShows[currentRound].find(s2 => s2==s) || pickedShows[currentRound][currentStep] == s);
				shows = shows.slice(0,4)
			}break;
			case 1:{
				shows = showsList.filter(s=>!pickedShows[currentRound].find(s2 => s2==s) || pickedShows[currentRound][currentStep] == s);
				shows = shows.slice(shows.length-4);
			}break;
			case 2:{
				shows = showsList.toSorted((a,b) => (a.no_of_reviews || 0) - (b.no_of_reviews || 0)).filter(s=>!pickedShows[currentRound].find(s2 => s2==s) || pickedShows[currentRound][currentStep] == s);
				shows = shows.slice(0,4)
			}break;
			case 3:{
				shows = showsList.toSorted((a,b) => (a.no_of_reviews || 0) - (b.no_of_reviews || 0)).filter(s=>!pickedShows[currentRound].find(s2 => s2==s) || pickedShows[currentRound][currentStep] == s);
				shows = shows.slice(shows.length-4);
			}break;
		}
	}else{
		switch(currentStep){
			case 0:{
				shows = pickedShows[currentRound-1].slice(0,2);
			}break;
			case 1:{
				shows = pickedShows[currentRound-1].slice(2,4);
			}break;
		}
	}
	
	return (
		 <SimpleGrid h={["100%","100%","500px"]} columns={[1,1,2]} spacing={2}>
			{
				shows.map((show, index) => {
					const isPicked = pickedShows[currentRound].find(s => s === show);
					return <Card bg={isPicked?"green.100":"none"} key={index} w={"100%"} h={"100%"} onClick={()=>{
										var shows = pickedShows;
										shows[currentRound][currentStep] = show;
										setPickedShows([...shows]);
									}}>
								<Image display={["none", "none", "block"]} alt="Show image" height={"75%"} width={"100%"} objectFit={"cover"} src={show.image_url || "https://fakeimg.pl/600x400?text=Show+Image"}></Image>
								<CardFooter justifyContent={"center"}>
									<Text>{show.title}</Text>
								</CardFooter>
							</Card>
				})
			}
		 </SimpleGrid>
	)
	
};