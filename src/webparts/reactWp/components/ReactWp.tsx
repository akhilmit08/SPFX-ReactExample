import * as React from 'react';
import styles from './ReactWp.module.scss';
import { IReactWpProps } from './IReactWpProps';
import { IReactWpState } from './IReactWpState';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {DefaultButton} from 'office-ui-fabric-react/lib/Button';
import {autobind} from 'office-ui-fabric-react';
import * as pnp from 'sp-pnp-js';
var url1:string="";
export default class ReactWp extends React.Component<IReactWpProps, IReactWpState> {

  public constructor(props: IReactWpProps, state: IReactWpState) {
    super(props);    
    this.state = {
    
      addTrainer:[]
    };
  }

  
  public render(): React.ReactElement<IReactWpProps> {
    return (
      <div className={ styles.reactWp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              
              <PeoplePicker
                context={this.props.context}
                titleText="People Picker"
                personSelectionLimit={3}
                groupName={""} // Leave this blank in case you want to filter from all users
                showtooltip={true}
                isRequired={true}
                disabled={false}
                ensureUser={true}
                selectedItems={this._getPeoplePickerItems}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000} />   

                <DefaultButton  
                  data-automation-id="addSelectedUsers"  
                  title="Add Selected Users"  
                  onClick={this.addSelectedUsers}>  
                  Add Selected Users  
                </DefaultButton>  

            </div>
          </div>
        </div>
      </div>
    );
  }
  @autobind 
  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);

    let selectedUsers = [];
    for (let item in items) {
      selectedUsers.push(items[item].id);      
    }

    this.setState({ addTrainer: selectedUsers });
  }
  @autobind 
  private addSelectedUsers(): void {
      
    pnp.sp.web.lists.getByTitle("News").items.add({
      Title: 'Trainer',      
      PublishedById: {
          results: this.state.addTrainer
          }
    }).then(i => {
        console.log(i);
    });
  } 
}
