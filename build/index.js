'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var interval = 5;

var calcHeightStep = function calcHeightStep(actualHeight, duration) {
  return actualHeight / (duration / interval);
};

var Expandable = function (_Component) {
  _inherits(Expandable, _Component);

  function Expandable(props) {
    _classCallCheck(this, Expandable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Expandable).call(this, props));

    _this.height = 0;

    _this.makeTogglable = _this.makeTogglable.bind(_this);
    return _this;
  }

  _createClass(Expandable, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.shouldExpanded !== this.props.shouldExpanded;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.shouldExpanded !== prevProps.shouldExpanded) {
        this.toggle();
      }
    }
  }, {
    key: 'setStyle',
    value: function setStyle(rule, value) {
      this.el.style[rule] = value;
    }
  }, {
    key: 'removeStyle',
    value: function removeStyle(rule) {
      this.el.style.removeProperty(rule);
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      clearInterval(this.clear);
      if (this.props.shouldExpanded) {
        this.props.onExpandStart();
        this.show();
      } else {
        this.props.onCollapseStart();
        this.hide();
      }
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      var heightNow = 0;
      var step = calcHeightStep(this.height, this.props.duration);
      this.setStyle('height', '0');
      this.setStyle('overflow', 'hidden');
      this.setStyle('display', 'block');
      this.clear = setInterval(function () {
        heightNow += step;
        if (heightNow >= _this2.height) {
          _this2.setStyle('height', _this2.height + 'px');
          _this2.removeStyle('overflow');
          _this2.props.onExpandEnd();
          clearInterval(_this2.clear);
          _this2.inProcess = false;
          return;
        }
        _this2.setStyle('height', heightNow + 'px');
      }, interval);
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      var heightNow = this.height;
      var step = calcHeightStep(this.height, this.props.duration);
      this.setStyle('overflow', 'hidden');
      this.setStyle('display', 'block');
      this.clear = setInterval(function () {
        heightNow -= step;
        if (heightNow <= 0) {
          _this3.setStyle('display', 'none');
          _this3.removeStyle('overflow');
          _this3.removeStyle('height');
          _this3.props.onCollapseEnd();
          clearInterval(_this3.clear);
          _this3.inProcess = false;
          return;
        }
        _this3.setStyle('height', heightNow + 'px');
      }, interval);
    }
  }, {
    key: 'makeTogglable',
    value: function makeTogglable(element) {
      this.el = element;
      this.height = element.clientHeight;
      if (!this.props.shouldExpanded) {
        this.setStyle('display', 'none');
        this.setStyle('height', '0px');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', _extends({}, this.props, {
        ref: this.makeTogglable
      }));
    }
  }, {
    key: 'isShown',
    get: function get() {
      return this.el.style.height === this.height + 'px';
    }
  }]);

  return Expandable;
}(_react.Component);

Expandable.propTypes = {
  duration: _react.PropTypes.number,
  shouldExpanded: _react.PropTypes.bool,
  onExpandStart: _react.PropTypes.func,
  onExpandEnd: _react.PropTypes.func,
  onCollapseEnd: _react.PropTypes.func,
  onCollapseStart: _react.PropTypes.func
};

Expandable.defaultProps = {
  duration: 300,
  shouldExpanded: false,
  onExpandStart: function onExpandStart() {},
  onExpandEnd: function onExpandEnd() {},
  onCollapseEnd: function onCollapseEnd() {},
  onCollapseStart: function onCollapseStart() {}
};

exports.default = Expandable;