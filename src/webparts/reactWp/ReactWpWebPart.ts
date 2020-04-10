import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';


import * as strings from 'ReactWpWebPartStrings';
import ReactWp from './components/ReactWp';
import { IReactWpProps } from './components/IReactWpProps';


export interface IReactWpWebPartProps {
  description: string;
}

export default class ReactWpWebPart extends BaseClientSideWebPart<IReactWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactWpProps > = React.createElement(
      ReactWp,
      {
        description: this.properties.description,
        weburl:this.context.pageContext.web.absoluteUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
