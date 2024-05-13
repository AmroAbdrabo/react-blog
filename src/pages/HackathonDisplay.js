import React from 'react';

// Styles for the component
const styles = {
  container: {
    fontFamily: '"Segoe UI", sans-serif',
    position: 'relative',
    width: '300px',
    maxWidth: '400px',
    height: '300px',
    margin: "auto",
    borderRadius: '8px',
    overflow: 'hidden',
    boxSizing: 'border-box', // Includes padding and border
    boxShadow: '5px 4px 15px rgba(255,255,255,0.9)',
    border: "0px solid green",
    backgroundColor: "white",
    cursor: 'pointer',
  },
  imageHalf: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    border: "0px solid red",
    backgroundRepeat: "no-repeat",
    transition: 'transform 0.5s ease-out',
    backgroundSize: 'contain',
    backgroundPosition: 'center'
  },
  leftHalf: {
    left: 0,
    backgroundPosition: 'right',
    backgroundImage: `url('')` // Placeholder for left half image URL
  },
  rightHalf: {
    right: 0,
    backgroundPosition: 'left',
    backgroundImage: `url('')` // Placeholder for right half image URL
  },
  text: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    marginTop: "0%",
    paddingLeft: "0%",
    justifyContent: 'top',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    transition: 'opacity 0.5s ease-in',
  },
  title: {
    marginTop: "10px",
    paddingLeft: "9%",
    fontSize: '24px',
  },
  date: {
    margin: "auto",
    marginBottom: "2%",
    marginTop: "0",
    border: "0px solid green",
    fontSize: '18px',
  },
  description: {
    fontSize: '16px',
    marginTop: "0",
    left: "0",
    marginLeft: "1%",
    border: "0px solid red",
    textAlign: 'left',
    padding: '0 10px',
  }
};

class HackathonDisplay extends React.Component {
  state = {
    hovered: false
  };

  toggleHover = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }));
  };

  render() {
    const { name, date, description, imageUrlLeft, imageUrlRight} = this.props;
    const { hovered } = this.state;
    
    return (
      <div 
        style={styles.container}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <div
          style={{
            ...styles.imageHalf,
            ...styles.leftHalf,
            backgroundImage: `url(${imageUrlLeft})`,
            transform: hovered ? 'translateX(-100%)' : 'none',
          }}
        />
        <div
          style={{
            ...styles.imageHalf,
            ...styles.rightHalf,
            backgroundImage: `url(${imageUrlRight})`,
            transform: hovered ? 'translateX(100%)' : 'none',
          }}
        />
        <div
          style={{
            ...styles.text,
            opacity: hovered ? 1 : 0,
          }}
        >
          <div style={styles.title}>{name}</div>
          <div style={styles.date}>{date}</div>
          <div style={styles.description}>{description}</div>
        </div>
      </div>
    );
  }
}

export default HackathonDisplay;
