import * as React from 'react';
import styles from './ReactWp.module.scss';
import { IReactWpProps } from './IReactWpProps';
import { IReactWpState } from './IReactWpState';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';
var url1:string="";
export default class ReactWp extends React.Component<IReactWpProps, IReactWpState> {

  public constructor(props: IReactWpProps, state: IReactWpState) {
    super(props);    
    this.state = {
      items: [
        {
          "Title": "",
          "ID": "",
        }
      ]
    };
  }

  public componentDidMount() {
    var reactHandler = this;
    url1=this.props.weburl;
    jquery.ajax({
      url: `${this.props.weburl}/_api/web/lists/getbytitle('News')/items`,
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      // tslint:disable-next-line:no-function-expression
      success: (resultData)=> {
        reactHandler.setState({
          items: resultData.d.results
        });
      },
      error: (jqXHR, textStatus, errorThrown)=> {
      }
    });
  }
  
  public render(): React.ReactElement<IReactWpProps> {
    return (
      
      <div className={styles.reactWp}>
        <div className={styles.maintitle}> Company News!</div>
        {
        // tslint:disable-next-line:no-function-expression
        this.state.items.map(function (item, key) {
          
          let url: string = `${url1}/lists/News/DispForm.aspx?ID=${item.ID}`;
          return (
            <ul>
              <div key={key}>
                <li><div className={styles.item}><a href={url}>{item.Title}</a></div> </li>
              </div>
            </ul>
          );

        })}
      </div>
    );
  }
}
