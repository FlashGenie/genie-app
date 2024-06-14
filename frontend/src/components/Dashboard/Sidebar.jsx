import {Card, Typography, List, ListItem, ListItemPrefix} from "@material-tailwind/react";
import {Bars3Icon, HeartIcon, GlobeAsiaAustraliaIcon} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
    return (
        <Card className="sticky top-20 max-h-96 w-full max-w-[15rem] p-4 md:max-w-[13rem]">
          <div className="mb-3 p-3 ml-1">
            <Typography variant="h5" color="blue-gray">
              Discover
            </Typography>
          </div>
          <List className="space-y-3">
            <Link to="/dashboard">
              <ListItem className= {location.pathname==='/dashboard' ? "flex items-center py-1 bg-slate-300" : "flex items-center py-1 hover:bg-slate-400 duration-300"}>
                <ListItemPrefix>
                  <Bars3Icon className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>
            <Link to="/favorites">
              <ListItem className={location.pathname==='/favorites' ? "flex items-center py-1 bg-slate-300" : "flex items-center py-1 hover:bg-slate-400 duration-300"}> 
                <ListItemPrefix>
                  <HeartIcon className="h-5 w-5" />
                </ListItemPrefix>
                Favorites
              </ListItem>
            </Link>
            <Link to="/explore">
              <ListItem className={location.pathname==='/explore' ? "flex items-center py-1 bg-slate-300" : "flex items-center py-1 hover:bg-slate-400 duration-300"}>
                <ListItemPrefix>
                  <GlobeAsiaAustraliaIcon className="h-5 w-5" />
                </ListItemPrefix>
                Explore
              </ListItem>
            </Link>
          </List>
        </Card>
    );
}

export default Sidebar;
