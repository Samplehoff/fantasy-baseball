import React from 'react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import './Stats.css'


class Adp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            players: []
        }
    }

    // check if User is logged in before loading component
    componentDidMount() {
        if (localStorage.getItem('username')) {
            this.functionAdp();
        } else {
            window.location.href= '/';
        }
    }

    findAdp = () => {
        this.setState({
            isLoaded: false
        })
        this.functionStats()
    }

    functionAdp() {

        let playerStats = [];
        fetch("https://api.sportsdata.io/v3/mlb/projections/json/PlayerSeasonProjectionStats/2020?key=5934312643214e288126a5db02650611")
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
                            items.map((item, i) => (
                                <Card key={i} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={ players.find(element => element.PlayerID === item.PlayerID).PhotoUrl} width="25px" height="200px" />
                                    <Card.Body>
                                        <Card.Title>{item.Name}</Card.Title>
                                            <Card.Text>
                                                Team: {item.Team}, Position: {item.Position}

                                            </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>2020 Average Draft Position: {item.AverageDraftPosition}</ListGroupItem>
                                        <ListGroupItem>2020 Projected Points: {item.FantasyPoints}</ListGroupItem>
                                        <ListGroupItem>2020 Projected FanDuel: {item.FantasyPointsFanDuel}</ListGroupItem>
                                        <ListGroupItem>2020 Projected DraftKings: {item.FantasyPointsDraftKings}</ListGroupItem>
                                        <ListGroupItem>2020 Projected Yahoo: {item.FantasyPointsYahoo}</ListGroupItem>
                                        
                                    </ListGroup>
  
                                </Card>

                                
                                
                            ))
                            
                    }
                    
                        

                </div>
                
            )
            
        }
    }
}

export default Adp