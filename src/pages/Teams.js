import React from 'react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import './Teams.css'


class Teams extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            teams: []
        }
    }

    // check if User is logged in before loading component
    componentDidMount() {
        if (localStorage.getItem('username')) {
            this.functionTeams();
        } else {
            window.location.href= '/';
        }
    }

    findTeams = () => {
        this.setState({
            isLoaded: false
        })
        this.functionTeams()
    }

    functionTeams() {

        let teamStats = [];
        fetch("https://api.sportsdata.io/v3/mlb/scores/json/TeamSeasonStats/2019?key=5934312643214e288126a5db02650611")
        .then(res => res.json())
        .then(
            (info) => {
                //console.log(info)
                teamStats = info;
            },
            (error) => {
                this.setState({
                    ...this.state,
                    isLoaded: true,
                    error: true
                })
            }
        ).then(
            fetch("https://api.sportsdata.io/v3/mlb/scores/json/teams?key=5934312643214e288126a5db02650611")
            .then(res => res.json())
            .then(
                (pics) => {
                    //console.log(pics)
                    let newState = {
                        ...this.state,
                        isLoaded: true,
                        items: teamStats,
                        teams: pics,
                    }
                    
                    this.setState(newState)
                } 
            )
        )
    }

    render2() {
        const {error, isLoaded, items, teams} = this.state;
        items.map(item => {
            let teamId = item.TeamID;
            let myteam = teams.find(element => element.TeamID === teamId)
            console.log(myteam.TeamID + " " + myteam.WikipediaLogoUrl)
        })
        return <div>Hello</div>
        
    }

    render() {
        const {error, isLoaded, items, teams} = this.state;
        //let myplayer = players.find(element => element.PlayerID === 10000001)
        //console.log(myplayer.PhotoUrl)
        // console.log(myplayer)
        // console.log(players)
        // console.log(items)  
       
        if(error) {
            return <div>Error...</div>
        }else if(!isLoaded) {
            return <div>Loading...</div>
        }else {
            return (
                <div className="image">
                    {
                            items.map((item, i) => (
                                <Card key={i} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={ teams.find(element => element.TeamID === item.TeamID).WikipediaLogoUrl} height="200px" />
                                    <Card.Body>
                                        <Card.Title>{item.Name}</Card.Title>
                                            
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Hitting Stats |   Pitching Stats</ListGroupItem>
                                        <ListGroupItem>Hits: {item.Hits} |  Hits Given: {item.PitchingHits}</ListGroupItem>
                                        <ListGroupItem>HR: {item.HomeRuns} | HR Given Up: {item.PitchingHomeRuns}</ListGroupItem>
                                        <ListGroupItem>RBIs: {item.RunsBattedIn} | ERA: {item.EarnedRunAverage}</ListGroupItem>
                                        <ListGroupItem>Strike Outs: {item.Strikeouts} | K's: {item.PitchingStrikeouts}</ListGroupItem>
                                        <ListGroupItem>Walks: {item.Walks} | Walks: {item.PitchingWalks}</ListGroupItem>
                                    </ListGroup>
  
                                </Card>

                                
                                
                            ))
                            
                    }
                    
                        

                </div>
                
            )
            
        }
    }
}

export default Teams