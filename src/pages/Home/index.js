import React from 'react';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            fname: '',
            lname: '',
            birthdayDate: '',
            gender: '',
        }
    }

    onFirstNameChange = (event) => {
        this.setState({ fname: event.target.value });
    }

    onLastNameChange = (event) => {
        this.setState({ lname: event.target.value });
    }

    onBirthDateChange = (event) => {
        this.setState({ birthdayDate: event.target.value });
    }

    onGenderChange = (event) => {
        this.setState({ gender: event.target.value });
    }

    render() {
        return (
            <div style={{ backgroundColor: "lightblue", width: '100%', alignItems: 'center' }}>
                <h1 style={{ color: "red", backgroundColor: 'green', margin: 'auto', display: 'inline-block', textAlign: 'center' }}>Register</h1>
                <div style={{}}>
                    <form /* className={classes.root} */ noValidate autoComplete="off">
                        <label >First name:
                        <input type="text" id="fname" name="fname" value={this.state.fname} onChange={this.onFirstNameChange} />
                        </label>
                        <br />
                        <br />
                        <label >Last name:</label>
                        <input type="text" id="lname" name="lname" value={this.state.lname} onChange={this.onLastNameChange} />
                        <br />
                        <br />
                        <label>Birthday:</label>
                        <input type="date" id="birthday" name="birthday" value={this.state.birthdayDate} onChange={this.onBirthDateChange} />
                        <br />
                        <br />
                        <label>Select Gender:</label>
                        <select id="gender" value={this.state.gender} onChange={this.onGenderChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                        <br />
                        <br />

                        <input type="checkbox" id="gender1" name="gender1" value="Male" />
                        <label for="gender1"> Male</label>
                        <input type="checkbox" id="gender2" name="gender2" value="Female" />
                        <label for="gender2"> Female</label>
                        <input type="checkbox" id="gender3" name="gender3" value="Others" />
                        <label for="gender3"> Others</label>
                        <button
                            onClick={() => {
                                console.log('i clicked', this.state);
                            }}
                            name="click"
                            type="button"
                            style={{ backgroundColor: "blue", color: "white", fontSize: 22, fontWeight: 10000/* , float: 'right' */, display: "block", textAlign: "center", paddingLeft: 10, paddingRight: 10 }}
                        >
                            Click
                         </button>
                    </form >
                    {/* <form>
                        <label>
                            Name:
    <input type="text" name="name" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form> */}
                </div >
            </div >
        );
    }
}

export default Home;