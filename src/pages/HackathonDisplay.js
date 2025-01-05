import React from 'react';

// Styles for the component
const styles = {
  container: {
    fontFamily: '"Segoe UI", sans-serif',
    position: 'relative',
    width: '300px',
    maxWidth: '400px',
    height: '300px',
    margin: 'auto',
    borderRadius: '8px',
    overflow: 'hidden',
    boxSizing: 'border-box', // Includes padding and border
    boxShadow: '5px 4px 15px rgba(255,255,255,0.9)',
    border: '0px solid green',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  invisibleContainer: {
    height: 0,
    visibility: 'hidden', // Makes it invisible but retains space
  },
  imageHalf: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    transition: 'transform 0.5s ease-out',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  leftHalf: {
    left: 0,
    backgroundPosition: 'right',
  },
  rightHalf: {
    right: 0,
    backgroundPosition: 'left',
  },
  text: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    transition: 'opacity 0.5s ease-in',
  },
  title: {
    fontSize: '24px',
    textAlign: 'center',
    width: '90%'
  },
  date: {
    fontSize: '18px',
  },
  description: {
    width: '80%',
    fontSize: '16px',
    textAlign: 'left',
  },
};

class HackathonDisplay extends React.Component {
  state = {
    hovered: false,
  };

  toggleHover = () => {
    this.setState((prevState) => ({ hovered: !prevState.hovered }));
  };

  render() {
    const { name, date, description, imageUrlLeft, imageUrlRight, invisible } = this.props;
    const { hovered } = this.state;

    return (
      <div
        style={{
          ...styles.container,
          ...(invisible ? styles.invisibleContainer : {}),
        }}
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
          <div
            style={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    );
  }
}

export default HackathonDisplay;
