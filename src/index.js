import { 
    websiteManagerFactory
} from './websiteManager';
import './style.css';

const siteManager = websiteManagerFactory();
siteManager.initiate();