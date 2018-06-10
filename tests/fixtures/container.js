import { connect } from 'react-redux';
import * as actions from './actions';

export const POST = '@@post/POST';

const mapStateToProps = state => state[POST];
const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps);
