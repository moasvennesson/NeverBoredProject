
import React from 'react';

class Request extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        fetch('http://www.boredapi.com/api/activity/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json,
                    isLoaded: true, 
                })
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { isLoaded, items } = this.state;
        if (!isLoaded)
            return <div>Loading...</div>;

        return (
            <div>
                <input className="form-control" ref={inputRefName} type="text" placeholder="Titel här" />
                {items.activity}
            </div>
        );

    }

}

export default Request;