import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonRows(props: any) {
    let body = []
    let columns = []
    for (let i = 1; i <= props.columns; i++) {
        columns.push(<td><Skeleton /></td>)
    }
    for (let i = 1; i <= props.rows; i++) {
        body.push(<tr className='skeleton'>
            {columns}
        </tr>)
    }
    return <>{body}</>
}

export default SkeletonRows
