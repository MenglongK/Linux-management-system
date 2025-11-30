#!/bin/bash
 =======================================================
      LINUX GROUP & PERMISSION MANAGEMENT SYSTEM
 =======================================================

# ======== UTILITY FUNCTIONS ========
pause() { read -p "Press Enter to continue..." dummy; }
draw_border() { echo "======================================================="; }

header() {
    clear
    draw_border
    printf "%*s\n" $(((${#1}+55)/2)) "$1"
    draw_border
    echo
}

# ======== CREATE GROUP ========
create_group() {
    read -p "Enter new group name: " groupname
    sudo groupadd "$groupname"
    echo -e "\e[32m[SUCCESS] Group '$groupname' created.\e[0m"
    pause
}

# ======== RENAME GROUP ========
rename_group() {
    read -p "Enter current group name: " old
    read -p "Enter new group name: " new
    sudo groupmod -n "$new" "$old"
    echo -e "\e[32m[SUCCESS] Group renamed from '$old' to '$new'.\e[0m"
    pause
}

# ======== DELETE GROUP ========
delete_group() {
    read -p "Enter group name to delete: " gname
    sudo groupdel "$gname"
    echo -e "\e[32m[SUCCESS] Group '$gname' deleted.\e[0m"
    pause
}

# ======== ADD USER TO GROUP ========
add_user_to_group() {
    read -p "Enter username: " user
    read -p "Enter group name: " gname
    sudo usermod -aG "$gname" "$user"
    echo -e "\e[32m[SUCCESS] User '$user' added to group '$gname'.\e[0m"
    pause
}

# ======== REMOVE USER FROM GROUP ========
remove_user_from_group() {
    read -p "Enter username: " user
    read -p "Enter group name: " gname
    sudo gpasswd -d "$user" "$gname"
    echo -e "\e[32m[SUCCESS] User '$user' removed from group '$gname'.\e[0m"
    pause
}

# ======== SET FOLDER PERMISSIONS ========
set_permissions() {
    read -p "Enter folder path: " folder
    read -p "Enter group name: " gname
    sudo chgrp -R "$gname" "$folder"
    sudo chmod -R 770 "$folder"
    echo -e "\e[32m[SUCCESS] Permissions 770 applied for group '$gname' on '$folder'.\e[0m"
    pause
}

# ======== VIEW GROUPS ========
view_groups(){
    header "ALL GROUPS AND MEMBERS"
    printf "\e[33m%-20s | %-5s | %-30s\e[0m\n" "Group Name" "GID" "Members"
    echo "-----------------------------------------------------------------------"

    # Read from /etc/group 
    if [ -f /etc/group ]; then
        while IFS=: read -r group_name password gid members; do
            members=${members:-<no members>}  # Show <no members> if empty
            printf "\e[34m%-20s\e[0m | %-5s | %-30s\n" "$group_name" "$gid" "$members"
        done < /etc/group
    else
        echo -e "\e[31mCannot read /etc/group on this system.\e[0m"
    fi

    pause
}



# ======== MAIN MENU ========
while true; do
    header "GROUP & PERMISSION MANAGEMENT"

    echo "  1. Create Group"
    echo "  2. Rename Group"
    echo "  3. Delete Group"
    echo "  4. Add User to Group"
    echo "  5. Remove User from Group"
    echo "  6. Set Folder Permissions"
    echo "  7. View Groups"
    echo "  8. Exit"

    draw_border
    read -p "Choose option (1-8): " choice

    case $choice in
        1) create_group ;;
        2) rename_group ;;
        3) delete_group ;;
        4) add_user_to_group ;;
        5) remove_user_from_group ;;
        6) set_permissions ;;
        7) view_groups ;;
        8) echo -e "\e[32mGoodbye!\e[0m"; exit 0 ;;
        *) echo -e "\e[31mInvalid option! Choose 1-8.\e[0m"; pause ;;
    esac
done

