delete_group() {
    if getent group "$GROUP_NAME" > /dev/null; then
        echo "Deleting group '$GROUP_NAME'..."
        groupdel "$GROUP_NAME"
        if [ $? -eq 0 ]; then
            echo "Group '$GROUP_NAME' deleted successfully."
        else
            echo "Error: Failed to delete group '$GROUP_NAME'. Check if it's the primary group for any user."
            exit 1
        fi
    else
        echo "Group '$GROUP_NAME' does not exist."
    fi
}