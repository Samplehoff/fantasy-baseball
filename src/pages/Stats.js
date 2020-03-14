import React from 'react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import './Stats.css'


class Stats extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            players: []
        }
    }

    componentDidMount() {
        this.functionStats();
    }

    findStats = () => {
        this.setState({
            isLoaded: false
        })
        this.functionStats()
    }

    functionStats() {

        let playerStats = [];
        fetch("https://api.sportsdata.io/v3/mlb/projections/json/PlayerSeasonProjectionStats/2019?key=5934312643214e288126a5db02650611")
        .then(res => res.json())
        .then(
            (info) => {
                //console.log(info)
                playerStats = info;
            },
            (error) => {
                this.setState({
                    ...this.state,
                    isLoaded: true,
                    error: true
                })
            }
        ).then(
            fetch("https://api.sportsdata.io/v3/mlb/scores/json/Players?key=5934312643214e288126a5db02650611")
            .then(res => res.json())
            .then(
                (pics) => {
                    //console.log(pics)
                    let newState = {
                        ...this.state,
                        isLoaded: true,
                        items: playerStats,
                        players: pics,
                    }
                    
                    this.setState(newState)
                } 
            )
        )
    }

    render2() {
        const {error, isLoaded, items, players} = this.state;
        items.map(item => {
            let playerId = item.PlayerID;
            let myplayer = players.find(element => element.PlayerID === playerId)
            console.log(myplayer.PlayerID + " " + myplayer.PhotoUrl)
        })
        return <div>Hello</div>
        
    }

    render() {
        const {error, isLoaded, items, players} = this.state;
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
                            items.map((item) => (
                                
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={ players.find(element => element.PlayerID === item.PlayerID).PhotoUrl} width="25px" height="200px" />
                                    <Card.Body>
                                        <Card.Title>{item.Name}</Card.Title>
                                            <Card.Text>
                                                Team: {item.Team}, Position: {item.Position}

                                            </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Hitting Stats |   Pitching Stats</ListGroupItem>
                                        <ListGroupItem>Hits: {item.Hits} |  Wins: {item.Wins}</ListGroupItem>
                                        <ListGroupItem>HR: {item.HomeRuns} | Losses: {item.Losses}</ListGroupItem>
                                        <ListGroupItem>RBIs: {item.RunsBattedIn} | ERA: {item.EarnedRunAverage}</ListGroupItem>
                                        <ListGroupItem>Strike Outs: {item.Strikeouts} | K's: {item.PitchingStrikeouts}</ListGroupItem>
                                        <ListGroupItem>Walks: {item.Walks} | Walks: {item.PitchingWalks}</ListGroupItem>
                                        <ListGroupItem>2019 Fantasy Points: {item.FantasyPoints}</ListGroupItem>
                                    </ListGroup>
  
                                </Card>

                                
                                
                            ))
                            
                    }
                    
                        

                </div>
                
            )
            
        }
    }
}

export default Stats