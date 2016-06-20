import React, { PropTypes, Component } from 'react';

const interval = 5;

const calcHeightStep = (actualHeight, duration) => actualHeight / (duration / interval);

class Expandable extends Component {

  constructor(props) {
    super(props);
    this.height = 0;

    this.makeTogglable = this.makeTogglable.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldExpanded !== this.props.shouldExpanded;
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldExpanded !== prevProps.shouldExpanded) {
      this.toggle();
    }
  }

  setStyle(rule, value) {
    this.el.style[rule] = value;
  }

  get isShown() {
    return this.el.style.height === `${this.height}px`;
  }

  removeStyle(rule) {
    this.el.style.removeProperty(rule);
  }

  toggle() {
    clearInterval(this.clear);
    if (this.props.shouldExpanded) {
      this.props.onExpandStart();
      this.show();
    } else {
      this.props.onCollapseStart();
      this.hide();
    }
  }

  show() {
    let heightNow = 0;
    const step = calcHeightStep(this.height, this.props.duration);
    this.setStyle('height', '0');
    this.setStyle('overflow', 'hidden');
    this.setStyle('display', 'block');
    this.clear = setInterval(() => {
      heightNow += step;
      if (heightNow >= this.height) {
        this.setStyle('height', `${this.height}px`);
        this.removeStyle('overflow');
        this.props.onExpandEnd();
        clearInterval(this.clear);
        this.inProcess = false;
        return;
      }
      this.setStyle('height', `${heightNow}px`);
    }, interval);
  }

  hide() {
    let heightNow = this.height;
    const step = calcHeightStep(this.height, this.props.duration);
    this.setStyle('overflow', 'hidden');
    this.setStyle('display', 'block');
    this.clear = setInterval(() => {
      heightNow -= step;
      if (heightNow <= 0) {
        this.setStyle('display', 'none');
        this.removeStyle('overflow');
        this.removeStyle('height');
        this.props.onCollapseEnd();
        clearInterval(this.clear);
        this.inProcess = false;
        return;
      }
      this.setStyle('height', `${heightNow}px`);
    }, interval);
  }

  makeTogglable(element) {
    if (!element) {
      return;
    }
    this.el = element;
    this.height = element.clientHeight;
    if (!this.props.shouldExpanded) {
      this.setStyle('display', 'none');
      this.setStyle('height', '0px');
    }
  }

  render() {
    return (
      <div
        {...this.props}
        ref={this.makeTogglable}
      />
    );
  }

}

Expandable.propTypes = {
  duration: PropTypes.number,
  shouldExpanded: PropTypes.bool,
  onExpandStart: PropTypes.func,
  onExpandEnd: PropTypes.func,
  onCollapseEnd: PropTypes.func,
  onCollapseStart: PropTypes.func,
};

Expandable.defaultProps = {
  duration: 300,
  shouldExpanded: false,
  onExpandStart: () => {},
  onExpandEnd: () => {},
  onCollapseEnd: () => {},
  onCollapseStart: () => {},
};

export default Expandable;
